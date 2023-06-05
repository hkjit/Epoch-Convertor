document.addEventListener("DOMContentLoaded", function() {
  var convertButton = document.getElementById("convert");
  convertButton.addEventListener("click", function() {
    var timestampInput = document.getElementById("timestamp");
    var resultDiv = document.getElementById("result");
    var timestamp = parseFloat (timestampInput.value);
	var historyList = document.getElementById("history");
    if (!isNaN(timestamp)) {
      var date = new Date(timestamp * 1000);
      var options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        timeZoneName: 'short' 
      };
      var formattedTime = date.toLocaleString('en-US', options);
      resultDiv.textContent = formattedTime;
	  
	  var historyEntry = document.createElement("li");
      historyEntry.textContent = timestamp + " = " + formattedTime;
      historyList.insertBefore(historyEntry, historyList.firstChild);
	  
	  // Remove oldest entry if the history exceeds 10 entries
      if (historyList.childElementCount > 10) {
        historyList.removeChild(historyList.lastElementChild);
      }
	  
	  // Save history data to local storage
      saveHistoryToLocalStorage(historyList.innerHTML);
	  
    } else {
      resultDiv.textContent = "Invalid timestamp";
    }
  });
  
  // Load history data from local storage
  var savedHistory = loadHistoryFromLocalStorage();
  var historyList = document.getElementById("history");
  historyList.innerHTML = savedHistory;
  
});

function saveHistoryToLocalStorage(historyData) {
  localStorage.setItem("timestampConverterHistory", historyData);
}

function loadHistoryFromLocalStorage() {
  return localStorage.getItem("timestampConverterHistory") || "";
}