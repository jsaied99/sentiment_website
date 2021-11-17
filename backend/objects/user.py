# Defines User Data Structure
class User:

    __slots__ = ["user_id", "password"]

    def __init__(self, user_id, password):
        self.user_id = user_id
        self.password = password

