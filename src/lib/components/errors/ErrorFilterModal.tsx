import { type ErrorsFilters } from "@/lib/filters/ErrorsFilters";
import { FilterInput } from "../FilterInput";
import { Modal, OnClose } from "../Modal";

export function ErrorFilterModal({
  filters,
  onClose,
  setFilters,
}: {
  filters: Partial<ErrorsFilters>;
  onClose: OnClose;
  setFilters: (filters: Partial<ErrorsFilters>) => void;
}) {
  return (
    <Modal onClose={onClose}>
      <h4>Filter</h4>
      <div className="p-4">
        <form>
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 ">
            <div></div>
            <div></div>
            <p className="text-xl">Exact?</p>

            <FilterInput
              name="message"
              filters={filters}
              setFilters={setFilters}
            />

            <FilterInput
              name="application"
              filters={filters}
              setFilters={setFilters}
            />

            <FilterInput
              name="kind"
              filters={filters}
              setFilters={setFilters}
            />

            <FilterInput
              name="severity"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
