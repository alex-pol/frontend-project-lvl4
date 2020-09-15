import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { addChannel } from '../../store/slices/channels';

const AddChannelModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onSubmit = async ({ name }, { setStatus }) => {
    if (!name) return;
    const data = {
      attributes: {
        name,
      },
    };
    const url = routes.channelsPath();
    try {
      const res = await axios.post(url, { data });
      dispatch(addChannel(res.data.data.attributes));
      onClose();
    } catch (e) {
      setStatus(e.message || 'Some error');
    }
  };
  const {
    values,
    status,
    handleChange,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit,
  });
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>{t('addChannelTitle')}</Modal.Header>
      <Modal.Body>
        <Form id="addChannelForm" onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            placeholder="Enter channel name"
            value={values.name}
            onChange={handleChange}
            disabled={isSubmitting}
            autoFocus
            isInvalid={Boolean(status)}
            aria-label="newChannelInput"
          />
          <Form.Control.Feedback type="invalid">{status}</Form.Control.Feedback>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('close')}
        </Button>
        <Button
          aria-label="submitChannelForm"
          variant="primary"
          type="submit"
          form="addChannelForm"
        >
          {t('add')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
