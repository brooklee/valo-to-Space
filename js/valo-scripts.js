console.log("hello")
const scriptURL = 'https://script.google.com/macros/s/AKfycbyI8Xr6LKoFPmV2c1eq6SR-2WDcAcTIBFxjX8XH5BBlKQGOst4/exec'
						const form = document.forms['submit-to-google-sheet']
						const page = document.querySelector('.page-hide')
						const loading = document.querySelector('.js-loading')
						const successMessage = document.querySelector('.js-success-message')
						const errorMessage = document.querySelector('.js-error-message')
						const errorDuplicateEmail = document.querySelector('.js-error-duplicate')

						const instructions = document.querySelector('.instructions')
						const map = document.querySelector('.gllpMap')

						var emails = []
						var currentEmail = ""

						// user email copy hack
						function copyUserEmail(f) {
							// getElementById('userEmailMobile').value = getElementById('userEmail').value;
							f.name.value = f.emailMobile.value;
						}
						
						

						//click to reveal map

						
						function showMap () {
							instructions.classList.add('hidden')
							map.classList.remove('hidden')
						}
						
						form.addEventListener('submit', e => {

							var emailMatched = 

							e.preventDefault()

							getCurrentEmail()
							emailMatches()
								// Push the Boolean response to emailMatched var
							// 	console.log(emails.every(emailMatches));
							// emailMatched = emails.every(emailMatches);

							console.log(emails.includes(currentEmail));
							emailMatched = emails.includes(currentEmail)
								

							compareEmails()
							showLoadingIndicator()
							// fetch(scriptURL, { method: 'POST', body: new FormData(form)})
							// 	.then(response => showSuccessMessage(response))
							// 	.catch(error => showErrorMessage(error))

							//Compare currentEmail to array 
							function compareEmails(){
								//Compare
							// for (i=0; i < emails.length; i++){
							// console.log(emails[i]);
							// //if there is a match show error message
							// if (currentEmail == emails[i]) {
							// 	console.log("uh oh there's a match")
							// 	showErrorDuplicateEmail();
							// 	//if no matching emails Post data and show success Message
							// 	} else {
							// 		console.log("good no matching emails")
							// 		fetch(scriptURL, { method: 'POST', body: new FormData(form)})
							// 	.then(response => showSuccessMessage(response))
							// 	.catch(error => showErrorMessage(error))
							// 	}
	
							// }

							
							
							//if there is a match show error message
							if (emailMatched === true) {
								console.log("uh oh there's a match")
								showErrorDuplicateEmail();
								//if no matching emails Post data and show success Message
								} else if (emailMatched === false){
									console.log("good no matching emails")
									fetch(scriptURL, { method: 'POST', body: new FormData(form)})
								.then(response => showSuccessMessage(response))
								.catch(error => showErrorMessage(error))
								}

							

						}
							
						})

						// var getData = () => {
						// 	fetch(scriptURL, { method: 'GET', body: FormData(form)})
						// 		console.log ("fetched")
						// }

						function showLoadingIndicator () {
							page.classList.add('is-hidden')
							loading.classList.remove('is-hidden')
						}
				
						function showSuccessMessage (response) {
							console.log('Success!', response, FormData)
							setTimeout(() => {
								successMessage.classList.remove('is-hidden')
								loading.classList.add('is-hidden')
							}, 500)
						}
				
						function showErrorMessage (error) {
							console.error('Error!', error.message)
							setTimeout(() => {
								errorMessage.classList.remove('is-hidden')
								loading.classList.add('is-hidden')
							}, 500)
						}

						function showErrorDuplicateEmail () {
							console.error('Error!')
							setTimeout(() => {
								errorDuplicateEmail.classList.remove('is-hidden')
								loading.classList.add('is-hidden')
							}, 500)
						}

// *************************************************************
						// data fetch to compare var currentEmail
// *************************************************************
						// ID of SpreadSheet
						// https://spreadsheets.google.com/feeds/list/1Q7OrRTByqyPn2sInibfRSkfTN1QtTolZTwR07L2QG3E/od6/public/basic?alt=json
						var spreadsheetID = "1Q7OrRTByqyPn2sInibfRSkfTN1QtTolZTwR07L2QG3E";

						// Make sure it is public or set to Anyone with link can view 
						var url = "https://spreadsheets.google.com/feeds/list/"+spreadsheetID+"/od6/public/values?alt=json";

						$.getJSON(url, function(data) {

							var entry = data.feed.entry;

							$(entry).each(function(){
								// Column names are name, age, etc.
								$('.results').prepend('<h2>'+this.content.$t+'</h2>');

								//Grab the submitted information
								var userInfo = this.content.$t

								//split the Info into an Array
								var userArray = userInfo.split(',')

								//grab the user email information
								var email = userArray[0]
								//push to emails arrary for comparison
								emails.push(email)

								// console.log($(this.content.$t).val().split(','))
							});

						});

// *************************************************************
						//End  data fetch to compare var currentEmail
// *************************************************************


// *************************************************************
						//Get the user input and put it in the currentEmail 
// *************************************************************
						// push user input into var currentEmail
						function getCurrentEmail(){
							var text = document.getElementById("userEmail").value;
							console.log(text)
							currentEmail = 'email: ' + text

						}
// *************************************************************
						//End Get the user input and put it in the currentEmail 
// *************************************************************


// *************************************************************
						//compare for matches return a Boolean
// *************************************************************
						//Check to see if any of the emails matched
						function emailMatches (currentValue) {
							console.log("this is currentValue: " + currentValue);
								return currentValue == currentEmail;
							}	
// *************************************************************
						//compare for matches return a Boolean
// *************************************************************	

						//Compare currentEmail to array 
						// function compareEmails(){
						// 	for (i=0; i < emails.length; i++){
						// 	console.log(emails[i]);
						// 	if (currentEmail == emails[i]) {
						// 		console.log("uh oh there's a match")
						// 		} else {
						// 			console.log("good no matching emails")
						// 		}
	
						// 	}
						// }
						



						// TODO: compare duplicate emails
						// TODO: send Message to user
						// TODO: Remove most recent entry from spreadsheet