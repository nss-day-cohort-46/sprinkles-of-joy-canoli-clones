const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".contactForm")

const render = () => {
    contentTarget.innerHTML = `
    <div id="orders__modal" class="modal--parent">
    <div class="modal--content">
        <form>
            <fieldset>
                <label for="contact-email">Email: </label>
                <input type="email" id="contact-email" name="contact-email" required>
            </fieldset>
            <fieldset>
                <label for="contact-phone">Phone Number: </label>
                <input type="tel" id="contact-phone" name="contact-phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
            </fieldset>
            <fieldset>
                <label for="contact-message">Message: </label>
                <textarea id="contact-message name="contact-message""></textarea>
            </fieldset>
            <fieldset>
            <button id="modal--close">Close</button>
            <fieldset>
            </form>
    </div>
    </div>
    `
}

// eventHub.addEventListener("click", event => {
//     if (event.target.id === "modal--close") {
//         closeModal()
//     }
// })

// const closeModal = () => {
//     contentTarget.innerHTML = ""
// }