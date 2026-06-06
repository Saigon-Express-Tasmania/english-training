"use client";

import { useEffect, useId, useRef, useState } from "react";
import { categoryOptions } from "@/assets/data/home";

const placeholder = categoryOptions[0];
const options = categoryOptions.slice(1);

export function CategorySelect() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="header-select border-neutral-30 bg-main-25 rounded-pill relative border"
    >
      <span className="select-icon translate-middle-y inset-inline-start-0 ms-lg-4 pointer-event-none absolute top-50 z-1 ms-12 !hidden text-xl 2xl:!block">
        <i className="ph-bold ph-squares-four"></i>{" "}
      </span>

      <div
        className={`select2 select2-container select2-container--default category-select${open ? " select2-container--open select2-container--below" : ""}`}
      >
        <span className="selection">
          <button
            type="button"
            className="select2-selection select2-selection--single"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="select2-selection__rendered">
              {selected ?? placeholder}
            </span>
            <span className="select2-selection__arrow" aria-hidden="true">
              <b />
            </span>
          </button>
        </span>

        {open ? (
          <span className="select2-dropdown select2-dropdown--below">
            <span className="select2-results">
              <ul
                id={listboxId}
                className="select2-results__options"
                role="listbox"
              >
                {options.map((option) => {
                  const isSelected = selected === option;
                  return (
                    <li
                      key={option}
                      role="option"
                      aria-selected={isSelected}
                      className={`select2-results__option select2-results__option--selectable${isSelected ? " select2-results__option--highlighted" : ""}`}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
