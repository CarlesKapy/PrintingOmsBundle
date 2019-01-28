<?php
/**
 * :tmtfactory) © 2018
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Command;


use Tmtfactory\PrintingOmsBundle\Domain\OrderLine\IOrderLine;

class ChangeOrderLineStatusCommand
{
    /**
     * @var IOrderLine
     */
    private $orderLine;

    /**
     * @var int
     */
    private $status;

    /**
     * ChangeOrderLineStatusCommand constructor.
     * @param IOrderLine $orderLine
     * @param int $status
     */
    public function __construct(IOrderLine $orderLine, int $status)
    {
        $this->orderLine = $orderLine;
        $this->status = $status;
    }

    /**
     * @return IOrderLine
     */
    public function getOrderLine(): IOrderLine
    {
        return $this->orderLine;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }
}