function onSubmit(e){
e.preventDefault()
showSpinner()
document.querySelector('.msg').textContent = ''
document.querySelector('#image').src = ''

const prompt = document.querySelector('#prompt').value
const size = document.querySelector('#size').value

if(prompt == '') {
    alert('input is empty')
    return
} 

generateImageRequest(prompt, size)

}

async function generateImageRequest(prompt, size) {

    try {
        showSpinner()

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        })
        console.log(response)

        if(!response.ok) {
            removeSpinner()
            throw new Error('That image cannot be generated')
        }

        const data = await response.json()
        // image uri 
        const imageUri = data.data

        document.querySelector('#image').src = imageUri
removeSpinner()
    } catch (error) {
        document.querySelector('.msg').textContent = error
    }

}

// spinner 
function showSpinner() {
    document.querySelector('.spinner').classList.add('.show')
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('.show')
}

document.querySelector('#image-form').addEventListener('submit', onSubmit)