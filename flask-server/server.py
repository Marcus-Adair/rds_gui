from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import numpy as np
import json





app = Flask(__name__)

# Give access to the front-end for making requests to the backend
CORS(app, resources={r"/dspaces/var": {"origins": "http://localhost:3000"},
                     r"/dspaces/var/*": {"origins": "http://localhost:3000"},
                     r"/dspaces/obj/*/*": {"origins": "http://localhost:3000"}
                     })





# API Routes

# Route to get all the names of vars in the dataspaces server
@app.route("/dspaces/var")
def dspacesvar():
    api_url = "http://localhost:9999/dspaces/var"
    response = requests.get(api_url)
    return response.json()


@app.route("/dspaces/var/<obj_name>")
def dspacesvarname(obj_name):
    api_url = f"http://localhost:9999/dspacesvar/{obj_name}"
    response = requests.get(api_url)
    return response.json()





# TODO: make a route for retrieving data from the dspaces server
@app.route("/dspaces/obj/<obj_name>/<obj_version>", methods=['POST'])
def dspacesobjnameversion(obj_name, obj_version):

    box = request.json

    api_url = f"http://localhost:9999/dspaces/obj/{obj_name}/{obj_version}?timeout=100"


    response = requests.post(api_url, json=box)




    lb = response.headers['x-ds-lower-bounds'].split(',')
    ub = response.headers['x-ds-upper-bounds'].split(',')

    tag = int(response.headers['x-ds-tag'])
    dtype = np.sctypeDict[tag]
    dims = tuple([(int(u) - int(l)) + 1 for (l,u) in zip(lb,ub)])

    a = np.ndarray(dims, dtype=dtype, buffer=response.content)


    return {"headers": str(response.headers), "content": str(a)}



    # return jsonify(response.json())





# TODO: make a route for putting data into the dspaces server


if __name__ == "__main__":
    app.run(port=8000, debug=True)