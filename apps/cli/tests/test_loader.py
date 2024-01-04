from unittest import TestCase
from ..loader import Loader


class TestLoader(TestCase):
    loader = Loader()

    def test_dynamodb(self):
        item_count: int = self.loader.load_dynamodb()
        assert item_count > 0

    def test_portfolio(self):
        df = self.loader.read_portfolio()
        assert len(df) > 0
