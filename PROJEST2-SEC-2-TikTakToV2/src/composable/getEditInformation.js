const addNewSlot = async (information) => {
    try {
        const res = await fetch(`http://localhost:5000/Player/${information.id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(information)
            }
        )
        if (res.status === 200) {
            console.log('Edit successfully')
        } else {
            throw new Error('Cannot edit!')
        }
    } catch (error) {
        console.log(`ERROR cannot read data: ${error}`);
    }
}

const setCurrentUser = async (user) => {
    try {
        const res = await fetch(`http://localhost:5000/CurrentUser/user`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        )
        if (res.status === 200) {
            console.log('Edit successfully')
        } else {
            throw new Error('Cannot edit!')
        }
    } catch (error) {
        console.log(`ERROR cannot read data: ${error}`);
    }
}

export { addNewSlot, setCurrentUser }