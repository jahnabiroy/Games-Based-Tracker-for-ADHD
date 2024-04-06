from flask import Flask, render_template
from tictactoedemo import TicTacToeGame

app = Flask(__name__)

@app.route('/')
def index():
    game = TicTacToeGame()
    return render_template('index.html', game=game)

if __name__ == '__main__':
    app.run(debug=True)
