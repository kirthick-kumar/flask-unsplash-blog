from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)

UNSPLASH_ACCESS_KEY = '5U6fNZotZhRuPiFgljEwNZb4GOGF34rCTlgr4vvXsVo'
API_URL = 'https://api.unsplash.com/'


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url
        }

with app.app_context():
    db.create_all()

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([p.to_dict() for p in posts])

@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.to_dict())


def fetch_image_for_post(title):
    response = requests.get(
        f"{API_URL}/search/photos",
        headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"},
        params={"query": title}
    )
    data = response.json()
    if data.get("results"):
        return data["results"][0]["urls"]["raw"]
    return None

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    image_url = fetch_image_for_post(title)

    post = Post(title=title, content=content, image_url=image_url)
    db.session.add(post)
    db.session.commit()

    return jsonify(post.to_dict()), 201


@app.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json()
    post.title = data.get('title', post.title)
    post.image_url = fetch_image_for_post(post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    return jsonify(post.to_dict())

@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'})

if __name__ == '__main__':
    app.run(debug=True)
