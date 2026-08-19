import Modal from './Modal'
import Button from './Button'

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Are you sure?', description, confirmLabel = 'Delete', variant = 'danger' }) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant={variant} onClick={() => { onConfirm(); onClose() }}>{confirmLabel}</Button>
        </>
      }
    >
      <p className="text-sm text-muted">This action cannot be undone.</p>
    </Modal>
  )
}
