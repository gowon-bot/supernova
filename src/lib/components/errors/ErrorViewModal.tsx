import { type ErrorWithTags } from "@/lib/database/ErrorService";
import { Modal, OnClose } from "../Modal";

export function ErrorViewModal({
  error,
  onClose,
}: {
  error: ErrorWithTags;
  onClose: OnClose;
}) {
  return (
    <Modal onClose={onClose}>
      <h5>
        {error.kind} <span className="text-secondary">({error.id})</span>
      </h5>
      <div>
        <p>
          Application:{" "}
          <span className="text-secondary">{error.application}</span>
        </p>
        <p>
          Message: <span className="text-secondary">{error.message}</span>
        </p>
        <p>
          Severity: <span className="text-secondary">{error.severity}</span>
        </p>
        <p>
          Occurred:{" "}
          <span className="text-secondary">
            {new Date(error.createdAt).toLocaleString()}
          </span>
        </p>

        <div>
          <p>Tags:</p>

          <div className="ml-10">
            {error.tags.map((tag) => (
              <p key={tag.id} className="mr-2">
                {tag.key}: <span className="text-secondary">{tag.value}</span>
              </p>
            ))}
          </div>
        </div>

        <p>
          Stack: <br /> <span className="text-secondary">{error.stack}</span>
        </p>
      </div>
    </Modal>
  );
}
