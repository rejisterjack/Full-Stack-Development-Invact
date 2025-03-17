from flask import Flask, jsonify, request

app = Flask(__name__)

githubPublicData = {
    'username': 'ankit123',
    'fullName': 'Ankit Kumar',
    'email': 'ankit@gmail.com',
    'repositories': 24,
    'gists': 12,
    'joinedOn': 'Sep 2018',
}

def getProfileUrl():
    return {'profileUrl': f"https://github.com/{githubPublicData['username']}"}

@app.route('/github-profile', methods=['GET'])
def github_profile():
    return jsonify(getProfileUrl())

def getPublicEmail():
    return {'publicEmail': githubPublicData['email']}

@app.route('/github-public-email', methods=['GET'])
def github_public_email():
    return jsonify(getPublicEmail())

def getReposCount():
    return {'reposCount': githubPublicData['repositories']}

@app.route('/github-repos-count', methods=['GET'])
def github_repos_count():
    return jsonify(getReposCount())

def getGistsCount():
    return {'gistsCount': githubPublicData['gists']}

@app.route('/github-gists-count', methods=['GET'])
def github_gists_count():
    return jsonify(getGistsCount())

def getUserBio():
    return {
        'fullName': githubPublicData['fullName'],
        'joinedOn': githubPublicData['joinedOn'],
        'email': githubPublicData['email']
    }

@app.route('/github-user-bio', methods=['GET'])
def github_user_bio():
    return jsonify(getUserBio())

def getRepoUrl(repoName):
    return {'repoUrl': f"https://github.com/{githubPublicData['username']}/{repoName}"}

@app.route('/github-repo-url', methods=['GET'])
def github_repo_url():
    repoName = request.args.get('repoName')
    if not repoName:
        return jsonify({'error': 'repoName parameter is required'}), 400
    return jsonify(getRepoUrl(repoName))

if __name__ == '__main__':
    app.run(debug=True)