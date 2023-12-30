from unittest import TestCase
from ..loader import Loader


class TestLoader(TestCase):
    loader = Loader()

    def test_dynamodb(self):
        self.loader.load_dynamodb()

    def test_portfolio(self):
        self.loader.read_portfolio()
