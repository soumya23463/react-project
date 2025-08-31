import React from 'react'

const Footer = () => {
    let footerStyle = {
        position: "relative",   
        width: "100%",
    }
  return (
    <footer className='bg-dark text-light py-3 text-center' style={footerStyle}>
        Copyright &copy; MyTodosList.com | All Rights Reserved | Terms and Conditions
    </footer>
  )
}

export default Footer
