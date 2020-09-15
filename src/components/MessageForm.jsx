import React, { useContext, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Form, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { DataContext } from '../store';
import routes from '../routes';
import { getActiveChannel } from '../store/selectors';

const validationSchema = yup.object().shape({
  message: yup.string().required(),
});

const MessageForm = () => {
  const { t } = useTranslation();
  const initialValues = {
    message: '',
  };
  const channel = useSelector(getActiveChannel);
  const { userName } = useContext(DataContext);
  const input = useRef(null);
  const onSubmit = async ({ message }, { resetForm, setStatus }) => {
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
      setStatus(e.message || t('errors.general'));
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
    validationSchema,
  });
  return (
    <Form
      name="messageForm"
      role="form"
      aria-label="messageForm"
      noValidate
      onSubmit={handleSubmit}
    >
      <FormControl
        ref={input}
        placeholder={t('messageForm.inputPlaceholder')}
        onChange={handleChange}
        value={values.message}
        name="message"
        disabled={isSubmitting}
        autoFocus
        isInvalid={Boolean(status)}
        aria-label="message"
        role="textbox"
      />
      <Form.Control.Feedback type="invalid">{status}</Form.Control.Feedback>
    </Form>
  );
};

export default MessageForm;
