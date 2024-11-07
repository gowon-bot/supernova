"use client";

import { callSupernova } from "@/lib/client/supernova";
import { PAGE_SIZE, type ErrorWithTags } from "@/lib/database/ErrorService";
import { useEffect, useState } from "react";
import { BlurryBackground } from "../BlurryBackground";
import { ErrorFilterModal } from "./ErrorFilterModal";
import { ErrorViewModal } from "./ErrorViewModal";

const tertiaryBorder = "3px solid var(--tertiary)";

export function ErrorTable() {
  const [errors, setErrors] = useState<ErrorWithTags[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<ErrorWithTags | undefined>(undefined);
  const [filters, setFilters] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  const canPaginate = total > PAGE_SIZE;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const onWarp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = e.currentTarget.warp.value;
    e.currentTarget.warp.value = "";

    const response = await callSupernova("GET", `errors/${id}`);

    const { error: errorToShow } = await response.json();

    if (errorToShow.id) {
      setError(errorToShow);
    }
  };

  useEffect(() => {
    if (!filtersOpen) {
      callSupernova("POST", "errors", {
        ...filters,
        offset: page * PAGE_SIZE,
      }).then(async (errors) => {
        const json = await errors.json();

        setErrors(json.errors);
        setTotal(json.totalCount);
      });
    }

    return () => {};
  }, [page, filters, filtersOpen]);

  return (
    <div className="p-4">
      <div className="mb-4 ml-2 flex justify-between">
        <form onSubmit={onWarp}>
          <label htmlFor="warp" className="mr-2 text-xl">
            Warp to:
          </label>
          <input type="text" title="warp" name="warp" placeholder="id" />
        </form>

        <div className="flex align-middle">
          {Object.keys(filters).length > 0 && (
            <p className="text-accent mr-2">!</p>
          )}

          <button
            type="button"
            className="text-xl"
            onClick={() => setFiltersOpen(true)}
          >
            Filter...
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-7">
          {/* Headers */}
          <TableHeader header={"ID"} noLeftBorder={true} />
          <TableHeader header={"Kind"} />
          <TableHeader header={"Application"} />
          <TableHeader header={"Message"} />
          <TableHeader header={"Severity"} />
          <TableHeader header={"User ID"} />
          <TableHeader header={"Occurred"} />

          {/* Data */}
          {errors.map((error, idx) => (
            <>
              <TableCell
                noBottomBorder={idx !== errors.length - 1}
                noLeftBorder={true}
                onClick={() => setError(error)}
              >
                {error.id}
              </TableCell>
              <TableCell noBottomBorder={idx !== errors.length - 1}>
                {error.kind}
              </TableCell>
              <TableCell noBottomBorder={idx !== errors.length - 1}>
                {error.application}
              </TableCell>
              <TableCell noBottomBorder={idx !== errors.length - 1}>
                {error.message}
              </TableCell>
              <TableCell noBottomBorder={idx !== errors.length - 1}>
                {error.severity}
              </TableCell>
              <TableCell noBottomBorder={idx !== errors.length - 1}>
                {error.userID}
              </TableCell>
              <TableCell noBottomBorder={idx !== errors.length - 1}>
                {new Date(error.createdAt).toLocaleString()}
              </TableCell>
            </>
          ))}
        </div>
      </div>

      <div className="ml-2 mt-1 text-secondary flex justify-between">
        <p className="text-xl">Total count: {total}</p>
        <div className="flex">
          <p className="text-xl">
            Page{" "}
            <span>
              {page + 1}/{totalPages}
            </span>
          </p>

          <button
            type="button"
            disabled={!canPaginate || page == 0}
            className="text-xl ml-4 disabled:text-tertiary"
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <button
            type="button"
            disabled={!canPaginate || page === totalPages - 1}
            className="text-xl ml-4 disabled:text-tertiary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {error && (
        <>
          <BlurryBackground />
          <ErrorViewModal error={error} onClose={() => setError(undefined)} />
        </>
      )}

      {filtersOpen && (
        <>
          <BlurryBackground />
          <ErrorFilterModal
            filters={filters}
            setFilters={setFilters}
            onClose={() => setFiltersOpen(false)}
          />
        </>
      )}
    </div>
  );
}

function TableHeader({
  header,
  noLeftBorder,
}: React.PropsWithChildren<{ header: string; noLeftBorder?: boolean }>) {
  return (
    <span
      className="text-xl border-2 pl-2"
      style={{
        borderBottom: tertiaryBorder,
        borderLeft: noLeftBorder ? undefined : tertiaryBorder,
      }}
    >
      {header}
    </span>
  );
}

function TableCell({
  children,
  noLeftBorder,
  noBottomBorder,
  onClick,
}: React.PropsWithChildren<{
  noLeftBorder?: boolean;
  noBottomBorder?: boolean;
  onClick?: () => void;
}>) {
  return (
    <span
      className={`py-1 pl-2 ${
        onClick ? "hover:cursor-pointer hover:underline" : ""
      }`}
      style={{
        borderLeft: noLeftBorder ? undefined : tertiaryBorder,
        borderBottom: noBottomBorder ? undefined : tertiaryBorder,
      }}
      onClick={onClick ?? (() => {})}
    >
      {children}
    </span>
  );
}
