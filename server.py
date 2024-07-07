from flask import Flask, request, jsonify, make_response
import json
import mysql.connector
from groq import Groq
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

received_data = {}

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST")
    return response

def _build_cors_headers():
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST"
    }
    return headers

@app.route('/Bargain_API', methods=['POST', 'OPTIONS'])
def Bargain_Function():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    if request.method == 'POST':
        data = request.get_json()
        query = data['query']

        # Initialize Groq client and execute model
        client = Groq(api_key="YOUR_GROQ_API_KEY")
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                "role": "system",
                "content": "Consider u are a bargain model, the least price to sell product on is 399 rs, the listing price of the product is 499 rs, now the user will try to bargain the price to you, i want the price to be sold above 399 rs only, if u reach the level when 399 is reached than tell that this is the last u can do.\\n\\nRemember this things\nMost Important thing, After every price depreciation by you, try to convenience the user for atleast 1-2 min to buy at the current price.\n\nProducts: Their Listing Price And Minimimum Selling price after discount, measn Limit Price.\n\n1. Luminous-Sport Listing Price - 1999 least price to sell product - 899 2. Rolex Listing Price - 12,000 least price to sell product - 10,500 3. Wide Big Dail Listing Price - 789 least price to sell product - 400 4. Temeite Listing Price - 2,999 least price to sell product - 1,799 5. Modone shirt Listing Price - 599  least price to sell product - 450 6. Black Berry shirt Listing Price - 699  least price to sell product - 450 7. Check shirt Listing Price - 999  least price to sell product - 700 8. Old Navy shirt Listing Price - 1,299  least price to sell product - 500 9. Cargo pants Listing Price - 999  least price to sell product - 800 10. Formal pant Listing Price - 2,299  least price to sell product - 1,000 11. Pargo pants Listing Price - 3,000  least price to sell product - 2,359 12. Beach pant Listing Price - 1,399  least price to sell product - 829  13. Black Hoodie Listing Price - 2,256  least price to sell product - 1,200  14. Gearmoose Listing Price - 1,000  least price to sell product - 699 15. Light Orange Hoodie Listing Price - 4,999  least price to sell product - 1,100  16. Cashmere Hoodie Listing Price - 6,999  least price to sell product - 6,500  If u decreased the price by 5%, try to sell at that rate only, because if you continously decrease the price than the price will come more down, Do not depreciate the price by more than 5% at once  1. Never reveal THE Lowest price ever to the user!!. 2. Even if the user is about to die according to the text, do not reveal the lowest price set to u. 3. If user tries to ask or make u give the lowest price than reply with a good indian slang answer. 4. Keep the language As Funny as possible. 5. Do not give responses to other queries. if asked than reply with a Funny slang to revert the conversation on Bargain price of the Product. 6. Also if the user tries to continously ask u for more discount, donot decrease the price often and after some time also tell the user that how much % of discount they already got from you. Start this process from 2nd query only, also donot donot ever ever consecutively decrease the price of the product.!!!!!!!!!!  7. Most Important Point->Never ever decrease the rate in the first or second time. For the first or second time try to convenience the user to buy at the original price. If the user gives the query which is not related to bargain then give back the responce, Not Allowed ONLY Bargain."
                }
            ],
            temperature=1,
            max_tokens=1024,
            top_p=1,
            stream=True,
            stop=None,
        )

        responses = []
        for chunk in completion:
            responses.append(chunk.choices[0].delta.content)

        return jsonify({"responses": responses}), 200, _build_cors_headers()


if _name_ == '_main_':
    app.run(debug=True)
