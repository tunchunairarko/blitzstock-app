import sellerChamp
import productDataApi
import AzProductInformation
import WlmtProductInformation
import json
import sys
import jsonpickle
def main():
    query=sys.argv[1]
    queryType=sys.argv[2]
    marketplace=jsonpickle.loads(sys.argv[3])
    # print(marketplace)
    # jsonpickle.loads
    # print(jsonpickle.loads(marketplace))
    #####################################3
    # if(marketplace['sellerChamp']==True):
    #     s=sellerChamp.SellerChamp(query)
    #     print(json.dumps(s.product_list))

    #1. If it is an ASIN then all good
    #2. If it is a UPC then: 
    #   -> Try to convert to a ASIN
    #   -> If convert successful, then get details from Sellerchamp
    #   -> If convert was not successful, then get product list from both productDataAPI and AzProductInformation
    #3. If it is a keyword:
    #   -> Search AzProductInformation
    #   -> Search ProductDataAPI

    if(queryType=='ASIN'):
        s=sellerChamp.SellerChamp(query)
        print(json.dumps(s.product_list))
    elif(queryType=='UPC'):
        api=AzProductInformation.AzProductInformation(query)
        resData=api.convertUpcToAsin()
        if not(resData=={}):
            ASIN=resData['asin']
            s=sellerChamp.SellerChamp(ASIN)
            print(json.dumps(s.product_list))
        else:
            api=productDataApi.ProductDataAPI(query)                
            prodDataApi=api.product_list
            api=AzProductInformation.AzProductInformation(query)
            api.getProductList()
            amzProductList=api.product_list
            productList=[{}]
            

if __name__=='__main__':
    main()