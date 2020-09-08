import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Form, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DataContext } from '../store';
import routes from '../routes';
import { getActiveChannel } from '../store/selectors';

const initialValues = {
  message: '',
};

const MessageForm = () => {
  const channel = useSelector(getActiveChannel);
  const { userName } = useContext(DataContext);
  const input = useRef(null);
  const onSubmit = async ({ message }, { resetForm, setStatus }) => {
    if (!message) return;
    const data = {
      attributes: {
        message,
        userName,
      },
    };
    const url = routes.channelMessagesPath(channel.id);
    try {
      await axios.post(url, { data });
      resetForm();
      input.current.focus();
    } catch (e) {
      setStatus(e.message || 'Some error');
    }
  };
  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    values,
    status,
  } = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormControl
        ref={input}
        placeholder="Enter message"
        onChange={handleChange}
        value={values.message}
        name="message"
        disabled={isSubmitting}
        autoFocus
        isInvalid={Boolean(status)}
      />
      <Form.Control.Feedback type="invalid">{status}</Form.Control.Feedback>
    </Form>
  );
};

export default MessageForm;
