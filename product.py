import razorpay
client = razorpay.Client(auth=("rzp_test_vOv0OJnGBqB5wd", "LnxcX51a7ZD3YFGzLJP1e6uD"))

order_amount = 5000
order_currency = 'INR'
order_receipt = 'order_rcptid_11'
notes = {'Shipping address': 'Bommanahalli, Bangalore'}   

client.order.create(amount=order_amount, currency=order_currency, receipt=order_receipt, notes=notes)
