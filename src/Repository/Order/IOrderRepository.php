<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Repository\Order;

use Tmtfactory\PrintingOmsBundle\Domain\Order\IOrder;


/**
 * Interface IOrderRepository
 * @package Tmtfactory\PrintingOmsBundle\Repository
 */
interface IOrderRepository
{

    /**
     * Returns an order which id matches the parameter
     *
     * @param $id
     * @return IOrder
     */
    public function findById($id): IOrder;

    /**
     * Return the parent order of order line
     *
     * @param $id
     * @return IOrder
     */
    public function findByOrderLineId($id): IOrder;

    /**
     * Return an array of orders which status and creation day matches with parameters
     *
     * @param int $status
     * @return array
     */
    public function findByStatus(int $status): array;

    /**
     * Return all possible status for an order
     *
     * @return array
     */
    public function getAllStatus(): array;

}