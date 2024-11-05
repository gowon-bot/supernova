import Image from "next/image";

export function Header() {
  return (
    <header>
      <div>
        <div className="flex align-center p-3">
          <Image
            src="/supernova.svg"
            alt="supernova logo"
            width={45}
            height={45}
            priority
          />

          <h4 className="text-accent ml-4">Supernova</h4>
        </div>
      </div>
    </header>
  );
}
