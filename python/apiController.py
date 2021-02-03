# import sellerChamp
from rainForestApi import RainForestApi
import productDataApi
import AzProductInformation
import WlmtProductInformation
import json
import sys
import jsonpickle
def main():
    query=sys.argv[1]
    queryType=sys.argv[2]
    # marketplace=jsonpickle.loads(sys.argv[3])
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

    # if(queryType=='ASIN'):
    #     s=sellerChamp.SellerChamp(query)
    #     print(json.dumps(s.product_list))
    # elif(queryType=='UPC'):
    #     api=AzProductInformation.AzProductInformation(query)
    #     resData=api.convertUpcToAsin()
    #     if not(resData=={}):
    #         ASIN=resData['asin']
    #         s=sellerChamp.SellerChamp(ASIN)
    #         print(json.dumps(s.product_list))
    #     else:
    #         api=productDataApi.ProductDataAPI(query)                
    #         prodDataApiList=api.product_list
    #         api=AzProductInformation.AzProductInformation(query)
    #         api.getProductList()
    #         amzProductList=api.product_list
    #         productList=[{}]
    #         for item in prodDataApiList:
    #             productList.append(item)
    #         for item in amzProductList:
    #             productList.append(item)
    #         print(json.dumps(productList))
    if(queryType=='ASIN'):
        api=RainForestApi()
        product_list=api.getProduct(asin=query)
        product_list[0]['key']='0'
        print(json.dumps(product_list))
    elif(queryType=='UPC'):
        api=RainForestApi()
        product_list=api.getProduct(upc=query)
        if not (product_list==[{}]):
            product_list[0]['key']='0'
            print(json.dumps(product_list))
        else:
            # api=productDataApi.ProductDataAPI(query)                
            # prodDataApiList=api.product_list
            
            api=RainForestApi()
            productList=api.searchProducts(query)
            amzProductList=productList
            productList=[]
            i=0 #this is required for react bootstrap table 2
            # for item in prodDataApiList:
            #     item['key']=str(i)
            #     productList.append(item)
            #     i=i+1
            
            for item in amzProductList:
                item['key']=str(i)
                productList.append(item)
                i=i+1
            if(productList==[]):
                productList=[{}]
            print(json.dumps(productList))
    else:
        # api=productDataApi.ProductDataAPI(query)                
        # prodDataApiList=api.product_list
        
        api=RainForestApi()
        productList=api.searchProducts(query)
        amzProductList=productList
        productList=[]
        i=0 #this is required for react bootstrap table 2
        # for item in prodDataApiList:
        #     item['key']=str(i)
        #     productList.append(item)
        #     i=i+1
        
        for item in amzProductList:
            item['key']=str(i)
            productList.append(item)
            i=i+1
        if(productList==[]):
            productList=[{}]
        print(json.dumps(productList))
            

if __name__=='__main__':
    main()