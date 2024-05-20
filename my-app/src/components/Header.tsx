interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-2xl font-bold text-black mt-5 mb-5">
        {title}
      </h1>
    </div>
  );
}
