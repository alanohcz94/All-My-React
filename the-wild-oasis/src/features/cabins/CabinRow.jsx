import styled from "styled-components";
import React from "react";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDelete.Cabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId}/>
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={() => handleDuplicate(cabin)} disabled={isCreating}>Duplicate</Menus.Button>

            <Modal.Open opens="edit-form">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            
            <Modal.Open opens="delete-form">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

          </Menus.List>
        </Menus.Menu>

          
          <Modal.Window name="edit-form">
            <CreateCabinForm cabinToEdit={cabin}/>
          </Modal.Window>
          
          <Modal.Window name="delete-form">
            <ConfirmDelete onConfirm={() => deleteCabinMutate(cabinId)}
              disabled={isDeleting}/>
          </Modal.Window>
        </Modal>

      
      </div>
    </Table.Row>
  );
};

export default CabinRow;
