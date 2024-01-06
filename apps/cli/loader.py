import fire
import logging
import pandas as pd
import boto3
from typing import Final
from logging import Logger
from decimal import Decimal


def create_logger() -> Logger:
    logger = logging.getLogger(__name__)
    logger.propagate = False
    logger.setLevel(logging.DEBUG)

    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter(
        "%(asctime)s - [ %(filename)s:%(lineno)s - %(funcName)s() - %(levelname)s ] %(message)s"
    )
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    return logger


LOGGER: Final[Logger] = create_logger()


class Loader:
    PORTFOLIO_FILE = "apps/cli/data/portfolio.xlsx"

    def read_portfolio(self) -> pd.DataFrame:
        df = pd.read_excel(self.PORTFOLIO_FILE)
        df.fillna(-1, inplace=True)

        def to_decimal(x):
            return Decimal(str(x))

        for column, dtype in df.dtypes.items():
            if dtype == "float64":
                df[column] = df[column].apply(to_decimal)
        return df

    def truncate_dynamodb_table(self, table_name):
        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table(table_name)
        table_key_names = [key.get("AttributeName") for key in table.key_schema]

        projectionExpression = ", ".join("#" + key for key in table_key_names)
        expressionAttrNames = {"#" + key: key for key in table_key_names}

        counter = 0
        page = table.scan(
            ProjectionExpression=projectionExpression,
            ExpressionAttributeNames=expressionAttrNames,
        )
        with table.batch_writer() as batch:
            while page["Count"] > 0:
                counter += page["Count"]
                for itemKeys in page["Items"]:
                    batch.delete_item(Key=itemKeys)
                if "LastEvaluatedKey" in page:
                    page = table.scan(
                        ProjectionExpression=projectionExpression,
                        ExpressionAttributeNames=expressionAttrNames,
                        ExclusiveStartKey=page["LastEvaluatedKey"],
                    )
                else:
                    break
        LOGGER.info(f"Deleted {counter} record(s) for {table_name}")

    def load_dynamodb(self) -> int:
        df = self.read_portfolio()
        dynamodb = boto3.resource("dynamodb")

        # Get table
        stock_table_name = "alpha2phi-alpha2phi-Stock"
        stock_table = dynamodb.Table(stock_table_name)

        # Truncate table
        self.truncate_dynamodb_table(stock_table_name)

        # Load table
        with stock_table.batch_writer(overwrite_by_pkeys=["symbol"]) as batch:
            for row in df.itertuples():
                batch.put_item(
                    Item={
                        "symbol": row.symbol,
                        "name": row.name,
                        "long_name": row.long_name,
                        "current_price": row.current_price,
                        "dividend_interval": row.dividend_interval,
                        "ex_dividend_date": row.ex_dividend_date,
                        "dividend_yield": row.dividend_yield,
                        "five_year_avg_dividend_yield": row.five_year_avg_dividend_yield,
                        "_52_weeks_low": row._15,
                        "_52_weeks_high": row._16,
                        "beta": row.beta,
                        "earnings_date": row.earnings_date,
                        "nasdaq_url": row.nasdaq_url,
                        "yahoo_finance_url": row.yahoo_finance_url,
                        "aristocrat": row.aristocrat,
                    }
                )
        LOGGER.info(f"Loaded {len(df)} rows into {stock_table_name}")
        return len(df)


if __name__ == "__main__":
    loader = Loader()
    fire.Fire({"dynamodb": loader.load_dynamodb})
