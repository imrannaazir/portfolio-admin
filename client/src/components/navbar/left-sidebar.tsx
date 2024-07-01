import MainNav from "./main-nav";

const LeftSidebar = () => {
  return (
    <div className="min-w-[256px] bg-muted/40 sticky top-0  h-screen pt-10 -mt-16 pr-1 hidden lg:block">
      <MainNav />
    </div>
  );
};

export default LeftSidebar;
