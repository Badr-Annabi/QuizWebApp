import pytest
from app import create_app
from db import db

@pytest.fixture(scope='module')
def test_client():
    app = create_app()
    app.config.from_object('config.TestingConfig')
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  # Create tables in the test database
        yield client
        with app.app_context():
            db.drop_all()  # Drop tables after tests
