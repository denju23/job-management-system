import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const JobFormModal = ({ show, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(initialData || {});
  }, [initialData, reset]);


  useEffect(() => {
  if (show) {
    reset(initialData || {
      title: '',
      description: '',
      status: 'open'
    });
  }
}, [initialData, reset, show]);


  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Modal.Header closeButton  className="border-0">
          <Modal.Title>{initialData ? 'Edit Job' : 'Create Job'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              isInvalid={!!errors.title}
              {...register('title', { required: 'Title is required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              isInvalid={!!errors.description}
              {...register('description', { required: 'Description is required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select {...register('status')} defaultValue={initialData?.status || 'open'}>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer  className="border-0">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default JobFormModal;
