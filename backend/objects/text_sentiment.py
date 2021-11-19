
class TextSentiment:

    __slots__ = ["body", "sentiment"]

    def __init__(self, body, sentiment):
        self.body = body
        self.sentiment = sentiment
    def __str__(self):
        return {
            'body': self.body,
            'sentiment': self.sentiment
        }
