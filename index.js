const SMART_CONTRACT_URL = "dev-1650108643381-34559926722748"
const METHOD_NAME = "NAME"

$("#HelloAll").click(function (e) {
  e.preventDefault()
  var nameInput = $("#name").val() 
  paramsBase64 = btoa(JSON.stringify({ name: nameInput })) 

  var settings = {
    url: "https://rpc.testnet.near.org",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "call_function",
        finality: "final",
        account_id: SMART_CONTRACT_URL,
        method_name: METHOD_NAME,
        args_base64: paramsBase64,
      },
    }),
  }

  $.ajax({
    ...settings,
    success: function (result) {
      resultJson = JSON.stringify(result)
      resultTextBytes = JSON.stringify(JSON.parse(resultJson).result)
      resultString = String.fromCharCode
        .apply(String, JSON.parse(resultTextBytes).result) 
        .replace(/['"]+/g, "") 

      $("#result").html(resultString)
    },
    error: function (e) {
      alert(e)
    },
  })
})