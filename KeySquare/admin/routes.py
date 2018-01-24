from flask import Blueprint

admin_route = Blueprint('admin', __name__)


@admin_route.route('/')
def admin():
    return "<h2>Hello admin</h2>"