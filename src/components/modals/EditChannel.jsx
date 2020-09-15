import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { get, find, propEq } from 'lodash/fp';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { updateChannel } from '../../store/slices/channels';

const EditChannelModal = ({ onClose, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { list } = useSelector(get('channels'));
  const channel = find(propEq('id', channelId), list);
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
      <Modal.Header closeButton>{t('editChannelTitle')}</Modal.Header>
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
            aria-label="editChannelInput"
          />
          <Form.Control.Feedback type="invalid">{status}</Form.Control.Feedback>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('close')}
        </Button>
        <Button aria-label="confirmBtn" variant="primary" type="submit" form="saveChannelForm">
          {t('save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChannelModal;
