import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { get, find, propEq } from 'lodash/fp';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes';
import { updateChannel } from '../../store/slices/channels';
import { closeEditModal } from '../../store/slices/modals';

const EditChannelModal = ({ channelId }) => {
  const dispatch = useDispatch();
  const { list } = useSelector(get('channels'));
  const channel = find(propEq('id', channelId), list);
  const onClose = () => dispatch(closeEditModal());
  const onSubmit = async ({ name }, { setStatus }) => {
    if (!name) return;
    const data = {
      attributes: {
        name,
      },
    };
    const url = routes.channelPath(channelId);
    try {
      const res = await axios.patch(url, { data });
      dispatch(updateChannel(res.data.data.attributes));
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
      name: channel.name,
    },
    onSubmit,
  });
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>Add channel</Modal.Header>
      <Modal.Body>
        <Form id="saveChannelForm" onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit" form="saveChannelForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChannelModal;
