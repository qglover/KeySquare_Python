from flask import Flask
from KeySquare.home.routes import home_route
from KeySquare.admin.routes import admin_route
from flask_bootstrap import Bootstrap


app = Flask(__name__)
Bootstrap(app)

app.register_blueprint(home_route)
app.register_blueprint(admin_route, url_prefix="/admin")

if __name__ == "__main__":
    app.run(debug=True)









