<?php
/**
 * :tmtfactory) © 2018
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Command;


use Tmtfactory\PrintingOmsBundle\Domain\Order\IOrder;

class ChangeOrderStatusCommand
{
    /**
     * @var IOrder
     */
    private $order;

    /**
     * @var int
     */
    private $status;

    /**
     * ChangeOrderStatusCommand constructor.
     * @param IOrder $order
     * @param int $status
     */
    public function __construct(IOrder $order, int $status)
    {
        $this->order = $order;
        $this->status = $status;
    }

    /**
     * @return IOrder
     */
    public function getOrder(): IOrder
    {
        return $this->order;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

}