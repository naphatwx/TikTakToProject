const getAccount = async () => {
    try {
        const res = await fetch('http://localhost:5000/Player')
        if(res.ok) {
          const account = await res.json()
          return account
        } else {
          throw new Error(`No account`)
        }
      } catch (error) {
        alert(`ERROR: can't read data, ${error}`)
        console.log(`ERROR: can't read data, ${error}`)
      }
}

export { getAccount }
