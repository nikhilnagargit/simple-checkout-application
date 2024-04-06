const page = ({ params }: { params: { checkoutlink_id: string } }) => {
  return (
    <div>
      This will become the checkout page integrated with stripe. You entered
      link for this in DB- {params.checkoutlink_id}
    </div>
  );
};

export default page;
