import fire
import logging
import pandas as pd
import boto3
from typing import Final
from logging import Logger


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
    PORTFOLIO_FILE = "packages/cli/data/portfolio.xlsx"

    def read_portfolio(self) -> pd.DataFrame:
        return pd.read_excel(self.PORTFOLIO_FILE)

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
        LOGGER.info(f"Deleted {counter} page(s) for {table_name}")

    def load_dynamodb(self, table_name="Stock"):
        # client = boto3.client("dynamodb")
        # response = client.list_tables()
        # for table in response["TableNames"]:
        #     self.truncate_dynamodb_table(table)

        # for row in df.itertuples():
        #     print(row.symbol)
        ...


if __name__ == "__main__":
    loader = Loader()
    fire.Fire(loader)
