import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../../routes';
import { addChannel } from '../../store/slices/channels';
import { closeNewModal } from '../../store/slices/modals';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeNewModal());
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
      <Modal.Header closeButton>Add channel</Modal.Header>
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
          />
          <Form.Control.Feedback type="invalid">{status}</Form.Control.Feedback>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" form="addChannelForm">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
