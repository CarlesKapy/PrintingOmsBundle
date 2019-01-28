<?php
/**
 * :tmtfactory) © 2018
 * Carles Capell <carles.capell@tmtfactory.com>
 */

namespace Tmtfactory\PrintingOmsBundle\Handler;


use Tmtfactory\PrintingOmsBundle\Command\ChangeOrderStatusCommand;
use Tmtfactory\PrintingOmsBundle\Repository\OrderLine\IOrderLineRepository;

class ChangeOrderStatusHandler
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
     * @param ChangeOrderStatusCommand $command
     */
    public function handle(ChangeOrderStatusCommand $command)
    {
        $order= $command->getOrder();
        $newStatus = $command->getStatus();

        foreach($order->getOrderLines() as $orderLine) {
            $this->orderLineRepository->updateOrderLineStatus($orderLine->getId(), $newStatus);
        }
    }
}