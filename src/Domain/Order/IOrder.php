<?php
/**
 * :tmtfactory) © 2019
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Domain\Order;


/**
 * Interface IOrder
 * @package Tmtfactory\PrintingOmsBundle\Domain\Order
 */
interface IOrder
{
    /**
     * @return mixed
     */
    public function getId();

    /**
     * @return array
     */
    public function getOrderLines(): array;

    /**
     * @return int
     */
    public function getStatus(): int;

}