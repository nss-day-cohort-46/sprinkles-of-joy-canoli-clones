import { submitContactMessage } from "./ContactProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".contactForm")

// this is the form which will render when contact is clicked.
const render = () => {
    contentTarget.innerHTML = `
    <div id="orders__modal" class="modal--parent">
    <div class="modal--content">
        <form class="formContainer">
            <fieldset>
                <label for="contact-email">Email: </label>
                <input type="email" id="contact-email" name="contact-email">
            </fieldset>
            <fieldset>
                <label for="contact-phone">Phone Number: </label>
                <input type="tel" id="contact-phone" name="contact-phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
            </fieldset>
            <fieldset>
                <label for="contact-message">Message: </label>
                <textarea id="contact-message" name="contact-message"></textarea>
            </fieldset>
            <fieldset>
            <button class="sumbitContactButton" id="submitContact" type="button">Submit</button>
            </fieldset>
            </form>
            <button id="modal--close">Close</button>
    </div>
    </div>
    `
}
// hears the click and gets the values from the form. formats how they will be sent to the api
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitContact") {
        clickEvent.preventDefault()
        const contactInfo = {
            "email": document.querySelector("#contact-email").value,
            "phone": document.querySelector("#contact-phone").value,
            "message": document.querySelector("#contact-message").value
        }
        submitContactMessage(contactInfo)
            .then(() => {
                document.querySelector(".formContainer").reset()
            })
    }
})

// listening for the click on the <a> that has an id="showContactForm". The <a> is in index.html
eventHub.addEventListener("click", event => {
    if (event.target.id === "showContactForm") {
        render()
    }
})

// how to close modal
eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
        closeModal()
    }
})

const closeModal = () => {
    contentTarget.innerHTML = ""
}