import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import emailjs from '@emailjs/browser';
import { Alert } from 'react-bootstrap';


let typingTimeoutEmail;
let typingTimeoutSubject;
let typingTimeoutMessage;

const ContactUs = ({changeMode}) => {
  const [success, setSuccess] = useState(false)

  const [email, setEmail] = useState("")
  const [chickEmail, setChickEmail] = useState("Email address")
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

  const [subject, setSubject] = useState("")
  const [chickSubject, setChickSubject] = useState("Your Subject")

  const [message, setMessage] = useState("")
  const [chickMessage, setChickMessage] = useState("Your Message")








useEffect(()=>{
  if (success) {
    const timer = setTimeout(()=>{
      setSuccess(false)
    },5000)

    return ()=>{
      clearTimeout(timer);
    };
  };

}, [success])







  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


    if(!emailRegex.test(email)){
      setChickEmail("Invalid Email address")
    }else if (subject === ""){
      setChickEmail("Email address")
      setChickSubject("Invalid Your Subject")
    }else if (message === ""){
      setChickSubject("Your Subject")
      setChickMessage("Invalid Your Message")
    }else{
      setChickMessage("Your Message")

      emailjs.sendForm('service_pos4c84', 'template_xauux5s', form.current, '8W8X1HfhC2Yq5gbyz')
      .then((result) => {
        setSuccess(true)
        form.current.reset()
        setEmail("")
        setSubject("")
        setMessage("")
      });
    }
  };


  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setChickEmail("typing...");

    clearTimeout(typingTimeoutEmail);
    typingTimeoutEmail = setTimeout(() => {
      setChickEmail("Email address");
    }, 1000);
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
    setChickSubject("typing...");

    clearTimeout(typingTimeoutSubject);
    typingTimeoutSubject = setTimeout(() => {
      setChickSubject("Your Subject");
    }, 1000);
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
    setChickMessage("typing...");

    clearTimeout(typingTimeoutMessage);
    typingTimeoutMessage = setTimeout(() => {
      setChickMessage("Your Message");
    }, 1000);
  };


  return (
    <>
      <div className={changeMode == "dark" ? "d-flex flex-column gap-5 justify-content-center align-items-center vh-100 " : "d-flex flex-column gap-5 justify-content-center align-items-center vh-100 light"}>
        <h2 className='text-center fs-3 text-info pe-3 ps-3 pe-md-0 ps-md-0 '>Contact with the Website developer!</h2>
        <Form ref={form} onSubmit={sendEmail} className='d-flex flex-column gap-4 col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3 p-3 shadow-style'>
        {success && (
          <Alert className='alert-style'>
            Message sent successfully!
          </Alert>
        )}
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={chickEmail === "typing..." ? `fw-bold fs-5 text-info` : chickEmail === "Invalid Email address" ? `fw-bold fs-5 text-danger` : `fw-bold fs-5 text-light`}>{chickEmail}</Form.Label>
            <Form.Control className='text-info border border-info' value={email} onChange={handleChangeEmail} name="user_email" type="text" placeholder="Please enter email"  style={{ backgroundColor: 'transparent'}}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className={chickSubject === "typing..." ? `fw-bold fs-5 text-info` : chickSubject === "Invalid Your Subject" ? `fw-bold fs-5 text-danger` : `fw-bold fs-5 text-light`}>{chickSubject}</Form.Label>
            <Form.Control className='text-info border border-info' value={subject} onChange={handleChangeSubject} name="subject" type="text" placeholder="Please enter your Subject"  style={{ backgroundColor: 'transparent'}}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className={chickMessage === "typing..." ? `fw-bold fs-5 text-info` : chickMessage === "Invalid Your Message" ? `fw-bold fs-5 text-danger` : `fw-bold fs-5 text-light`}>{chickMessage}</Form.Label>
            <Form.Control className='text-info border border-info' value={message} onChange={handleChangeMessage} name="message" as="textarea" rows={4} cols={4} placeholder="Please enter your Message"  style={{ backgroundColor: 'transparent'}}/>
          </Form.Group>

          <Form.Group  className='d-flex justify-content-center align-items-center'>
          <Button variant="outline-info" className='pe-5 ps-5' type="submit">
            Submit
          </Button>
          </Form.Group>
          
        </Form>
      </div>
    </>
  )
}

export default ContactUs