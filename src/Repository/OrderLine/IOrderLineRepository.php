<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Repository\OrderLine;


use Tmtfactory\PrintingOmsBundle\Domain\OrderLine\IOrderLine;

interface IOrderLineRepository
{

    /**
     * Returns an order line which id matches the parameter
     *
     * @param $id
     * @return IOrderLine
     */
    public function findById($id): IOrderLine;

    /**
     * Updates an OrderLine status
     *
     * @param $orderLineId
     * @param $newStatus
     * @return mixed
     */
    public function updateOrderLineStatus($orderLineId, $newStatus);

}