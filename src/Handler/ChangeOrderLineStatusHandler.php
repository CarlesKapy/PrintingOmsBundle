<?php
/**
 * :tmtfactory) © 2018
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Handler;


use Tmtfactory\PrintingOmsBundle\Command\ChangeOrderLineStatusCommand;
use Tmtfactory\PrintingOmsBundle\Repository\OrderLine\IOrderLineRepository;

class ChangeOrderLineStatusHandler
{
    /**
     * @var IOrderLineRepository
     */
    private $orderLineRepository;

    /**
     * ChangeOrderLineStatusHandler constructor.
     * @param IOrderLineRepository $orderLineRepository
     */
    public function __construct(IOrderLineRepository $orderLineRepository)
    {
        $this->orderLineRepository = $orderLineRepository;
    }

    /**
     * @param ChangeOrderLineStatusCommand $command
     */
    public function handle(ChangeOrderLineStatusCommand $command)
    {
        $orderLine = $command->getOrderLine();
        $newStatus = $command->getStatus();

        $this->orderLineRepository->updateOrderLineStatus($orderLine->getId(), $newStatus);
    }
}