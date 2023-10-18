const getInformation= (user) => {
    return  fetch(`https://tiktaktoprojectback.onrender.com/Player/${user}`)
        .then(resp => resp.json())
        .catch(error => `ERROR cannot read data: ${error}`);
}

const getUser= async () => {
    try {
        const res = await fetch(`https://tiktaktoprojectback.onrender.com/CurrentUser/user`)
            const user = await res.json()
            return user
    } catch (error) {
        console.log(`ERROR cannot read data: ${error}`);
    }
}

export { getInformation, getUser }
