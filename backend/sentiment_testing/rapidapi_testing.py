import requests

url = "https://text-sentiment.p.rapidapi.com/analyze"

payload = "text=Overall I did not have a good time at this restaurant. The service was slow and the food tasted bad."
headers = {
    'content-type': "application/x-www-form-urlencoded",
    'x-rapidapi-host': "text-sentiment.p.rapidapi.com",
    'x-rapidapi-key': "fee3605b21msh4d6bc11af69c256p1c9355jsn51f3405b24f3"
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)